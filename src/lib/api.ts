import { LookupResponse } from './types';

export async function lookupTrainer(name: string): Promise<LookupResponse> {
  const response = await fetch(`/api/lookup?name=${encodeURIComponent(name)}`);
  const data: LookupResponse = await response.json();
  return data;
}
