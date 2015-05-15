from zato.server.service import Service

SMS=u"""<?xml version="1.0" encoding="UTF-8"?>
<SMS>
  <operations><operation>SEND</operation></operations>
  <authentification><username>{username}</username><password>{password}</password></authentification>
  <message>
    <sender>eTachki.com</sender>
    <text>{message}</text>
  </message>
  <numbers>
    <number messageID="{id}">{to}</number>
  </numbers>
</SMS>"""


class SmsSend(Service):
    class SimpleIO:
        input_required = ('to', 'message')
        output_required = ("response", )
        
    def handle(self):
        self.log_input(user_msg="Input data: ")
        to = self.request.input.to
        message = self.request.input.message

        try:
            sms_chan = self.outgoing.plain_http.get('Sms AtomPark')
            r = sms_chan.conn.send(self.cid, {"XML": SMS.format(username="******", password="********", id=self.cid, to=to, message=message)})
            #self.logger.info("request headers: %s", r.request.headers)
            self.logger.info("res: %s", repr(r))
        except Exception, e:
            self.logger.exception(e)
        
        self.logger.info("AtomPark answered: %s", r.text)
        self.response.payload.response = r.text
