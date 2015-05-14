from zato.server.service import Service

if False:
    import logging

    # These two lines enable debugging at httplib level (requests->urllib3->httplib)
    # You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.
    # The only thing missing will be the response.body which is not logged.
    import httplib
    httplib.HTTPConnection.debuglevel = 1

    # You must initialize logging, otherwise you'll not see debug output.
    logging.basicConfig() 
    logging.getLogger().setLevel(logging.DEBUG)
    requests_log = logging.getLogger("requests.packages.urllib3")
    requests_log.setLevel(logging.DEBUG)
    requests_log.propagate = True


SMS="""<?xml version="1.0" encoding="utf-8"?>
<message>
 <oa>etachki</oa>
 <da>{to}</da>
 <text>{message}</text>
</message>"""

class SmsSend(Service):
    class SimpleIO:
        input_required = ('to', 'message')
        output_required = ("gsmu_response", )
        
    def handle(self):
        self.log_input(user_msg="Input data: ")
        to = self.request.input.to
        message = self.request.input.message

        try:
            sms_chan = self.outgoing.plain_http.get('GSMU SMS Send')
            r = sms_chan.conn.send(self.cid, SMS.format(to=to, message=message), headers={'Content-Type': 'text/xml'})
            #self.logger.info("request headers: %s", r.request.headers)
            self.logger.info("res: %s", repr(r))
        except Exception, e:
            self.logger.exception(e)
        
        self.logger.info("GSMU answered: %s", r.text)
        self.response.payload.gsmu_response = r.text
