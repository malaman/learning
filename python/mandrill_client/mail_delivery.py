# encoding: utf-8

import mandrill
import sys
from email.header import Header

MANDRILL_API_KEY = 'MANDRILL_API_KEY'


def send_mail(mail, vehicle_information, day, price):
    """
    Send mail via mandrill client

    :param mail: string, for example mail@example.com
    :param vehicle_information: string, "Opel Omega 1.4"
    :param day: string, for example "2014-01-02"
    :param price: string, for example "10000)
    :return: No Return
    """
    try:
        mandrill_client = mandrill.Mandrill(MANDRILL_API_KEY)
        template_content = []

        message = {
            'attachments': None,
            'auto_html': None,
            'auto_text': None,
            'bcc_address': None,
            'from_email': 'example_from@example.com',
            'from_name': 'Олег',
            'global_merge_vars': [{'name': 'vehicle_information', 'content': vehicle_information},
                   {'name': 'date', 'content': day},
                   {'name': 'price', 'content': price}],
            'google_analytics_campaign': None,
            'google_analytics_domains': None,
            'headers': None,
            'html': None,
            'images': None,
            'important': False,
            'inline_css': None,
            'merge': True,
            'merge_language': 'mailchimp',
            'merge_vars': None,
            'metadata': None,
            'preserve_recipients': None,
            'recipient_metadata': None,
            'return_path_domain': None,
            'signing_domain': None,
            'subaccount': None,
            'subject': 'Some Subject',
            'tags': None,
            'text': None,
            'to': [{'email': mail,
                 'name': None,
                 'type': 'to'}],
            'track_clicks': None,
            'track_opens': None,
            'tracking_domain': None,
            'url_strip_qs': None,
            'view_content_link': None}
        result = mandrill_client.messages.send_template(template_name='template-slug',
                                                        template_content=template_content, message=message, async=True)
        '''
        [{'_id': 'abc123abc123abc123abc123abc123',
          'email': 'recipient.email@example.com',
          'reject_reason': 'hard-bounce',
          'status': 'sent'}]
        '''
        print(result)

    except mandrill.Error, e:
        # Mandrill errors are thrown as exceptions
        print 'A mandrill error occurred: %s - %s' % (e.__class__, e)
        # A mandrill error occurred: <class 'mandrill.UnknownSubaccountError'> - No subaccount exists with the id 'customer-123'
        raise


def parse_csv(file_name):
    """

    :param file_name: string file should be within script director
    :return: No return
    """
    with open(file_name, 'r') as source_file:
        for line in source_file.readlines():
            message = line.strip().split(';')
            params = {}
            try:
                params['mail'] = message[0]
                params['vehicle_information'] = message[1]
                params['price'] = "".join(['$', message[2]]) if len(message[2]) else None
                params['day'] = message[3][:11]
            except IndexError:
                continue
            if params['price']:
                try:
                    send_mail(**params)
                except:
                    print("Unable to send message: {}".format(message))


def main(argv=None):
    """
    main method

    :param argv: list, list contains script params
    :return: No return
    """
    if not argv:
        argv = sys.argv
    if len(argv) < 2:
        print "Usage: mail_delivery.py [csv file]"
        return
    else:
        parse_csv(argv[1])


if __name__ == '__main__':
    main(sys.argv)
