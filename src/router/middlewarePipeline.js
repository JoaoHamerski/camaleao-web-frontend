export default function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context
  }

  return () => {
    nextMiddleware(
      middlewarePipeline(context, middleware, index + 1)
    )
  }
}
