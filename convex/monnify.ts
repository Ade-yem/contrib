import { httpAction } from "./_generated/server";

export const monnifyHook = httpAction(async (ctx, request) => {
  const { event, data} = await request.json();

  return new Response(null, {
    status: 200,
  })
})

