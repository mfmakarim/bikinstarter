import { Webhook } from "svix";

const webhookSecret: string = process.env.SIGNING_SECRET || "your-secret";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  const body = await req.text();

  const sivx = new Webhook(webhookSecret);

  let msg;
  
  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Bad Request" + err, { status: 400 });
  }

  console.log(msg);

  return new Response("OK", { status: 200 });
}