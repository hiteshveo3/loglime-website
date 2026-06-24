import { getRequiredEnv } from "@/lib/utils";

const LOOPS_API_URL = "https://app.loops.so/api/v1";

export async function sendLoopEmail(payload: {
  transactionalId: string;
  email: string;
  dataVariables?: Record<string, string | number | boolean | null>;
}) {
  const response = await fetch(`${LOOPS_API_URL}/transactional`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRequiredEnv("LOOPS_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Loops email failed with status ${response.status}`);
  }

  return response.json() as Promise<{ success: boolean }>;
}
