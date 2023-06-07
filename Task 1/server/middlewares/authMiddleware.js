export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers.api_key

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}