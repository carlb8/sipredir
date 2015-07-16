# sipredir
node.js implementation of sipcloak redirection service using DNS SRV and TXT records

Add DNS SRV record to your domain
_sip._udp	SRV	10 10 5060 yoursipredirserver.yourdomain

Add DNS TXT record to your domain
sip-youruserid	TXT	"realsipaddress@realsipdomain.somedomain"

sipredir.js will run from yoursipredirserver.yourdomain

When sipredir receives a dial request, it discards non-alphanumeric characters, then prefixes sip- to the userid.

