from zato.server.service import Service
import json


class SendEmailMandrill(Service):
    class SimpleIO:
        output_required = ('status', 'data')

    def _translate_input_params(self):
        """
        Translate input params to mandrill dynamic content variables format
        :return: list of dicts, [{"name": "subject", "content": "this is example subject"}]
        """
        return [{"name": key, "content": self.request.payload[key]}
                for key in self.request.payload]

    def _get_to_params(self):
        """
        Parse params of recepient

        :return: list of dicts, [{"email": "example@example.com", "name": "Sender Name", "type": "to"}]
        """
        recipient = self.request.payload['to']
        self.logger.info("recepient info: %s", recipient)

        return [{"email": recipient['address'],
                 "name": recipient.get('name', ''),
                 "type": "to"}]

    def get_sender_info(self, account):
        """
        Parse and return sender email and sender name

        :param account: string, account (production or devel) for zato kvdb configuration
        :return: tuple, (from_address, from_name), from_address - email (for example: example@example.com),
        from_name - name for email (for example Some Sender)
        """
        self.logger.info("Payload : %s", str(self.request.payload))
        if 'from_address' in self.request.payload:
            from_address = self.request.payload['from_address']
        else:
            from_address = self.translate('system', 'config', account,
                                          'mandrill', 'mail_from_default_address')
        if 'from_name' in self.request.payload:
            from_name = self.request.payload['from_name']
        else:
            from_name = self.translate('system', 'config', account,
                                       'mandrill', 'mail_from_default_name')
        self.logger.info("from_name: %s", from_name)
        self.logger.info("from_address: %s", from_address)

        return from_address, from_name

    def _send_email(self, key, template_name, global_merge_vars, to, account):
        """
        :param key: string, api key for mandrill
        :param template_name: string, template slug for mandrill template
        :param global_merge_vars: dict, dynamic content variables for template
        :param to: list of dicts, [{"email": "example@example.com, "name":"some_name", "type": "to"}]
        :param account: string, account (production or devel) for zato kvdb configuration
        :return: string, message for logging
        """
        output = {
            "key": "key",
            "template_name": "name",
            "template_content": [],
            "message": {
                "to": [],
                "global_merge_vars": [],
                "from_name": "",
                "from_email": ""
            }
        }
        from_email, from_name = self.get_sender_info(account)

        output['key'] = key
        output['template_name'] = template_name
        output['message']['to'] = to
        output['message']['global_merge_vars'] = global_merge_vars
        output['message']['from_name'] = from_name
        output['message']['from_email'] = from_email

        return self.outgoing.plain_http.get('Mandrill Messages Send').conn.send(self.cid, json.dumps(output))

    def handle(self):
        """
        mandatory handle function for service

        :return: No return
        """
        self.log_input('Input:')
        account = self.translate('system', 'config', 'instance', 'mandrill', 'account')
        self.logger.info("account: %s", account)
        api_key = self.translate('system', 'config', account, 'mandrill', 'api_key')
        self.logger.info("api_key: %s", api_key)

        self.logger.info("payload: %s", self.request.payload)

        template = self.request.payload['template_id']
        self.logger.info("template: %s", template)

        mail_chan_response = self._send_email(api_key, template,
                                              self._translate_input_params(),
                                              self._get_to_params(),
                                              account)

        self.logger.info("Mandrill Message Send res: %s", mail_chan_response.text)
        self.response.payload.status = mail_chan_response.json()[0]['status']
        self.response.payload.data = mail_chan_response.json()