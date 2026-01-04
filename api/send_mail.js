// send_mail.js disabled
// The mailer has been intentionally disabled per user request.
// If you need server-side mail later, restore a provider implementation here.

export default async function handler(req, res) {
  return res.status(404).json({ success: false, error: 'Mail service disabled in repository.' });
}
