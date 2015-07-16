var sip = require('sip');
var util = require('util');
var dns = require('dns');

var transport = sip.makeTransport({}, function(m, remote) {
  if(m.method && m.method !== 'ACK') {
    try {
      if(m.method === 'INVITE') {  
        var username = sip.parseUri(m.headers.to.uri).user;
        username = username.replace(/[^\da-zA-Z]/g, '');
        var domain = sip.parseUri(m.headers.to.uri).host;
        dns.resolveTxt('sip-'+username+'.'+domain, function (err, addresses) {
        if (err) {
            if (err.errno == dns.NOTFOUND) transport.send(remote, sip.makeResponse(m, 404, 'Not Found'));
            else
              throw err;
        } else {
           
             var rs = sip.makeResponse(m, 302, 'Moved Temporarily');
             rs.headers = m.headers;
             rs.headers.contact = 'sip:'+addresses[0]; 
             transport.send(remote, rs);
           }});} 
       else  
		transport.send(remote, sip.makeResponse(m,405, 'Method Not Allowed'));
    } catch(e) {
      util.debug(e);
      util.debug(e.stack);

      transport.send(remote, sip.makeResponse(m, 503, "Service Unavailable"));
    }
  }
});
