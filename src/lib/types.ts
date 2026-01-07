/**
 * Pokemon data from the external API
 */
export interface Pokemon {
  uuid: string;
  number: number;
  name: string;
  types: string[];
}

/**
 * Trainer data from the external API
 */
export interface TrainerData {
  trainer_id: string;
  trainer_name: string;
  pokemon: Pokemon | null;
}

/**
 * Internal API response wrapper
 */
export interface LookupResponse {
  success: boolean;
  data?: TrainerData;
  error?: {
    type: 'not_found' | 'validation' | 'network';
    message: string;
  };
}

/**
 * Application state for the lookup form
 */
export type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TrainerData }
  | { status: 'error'; errorType: 'not_found' | 'network'; message: string };

/**
 * Pokemon type color configuration
 */
export interface TypeColorConfig {
  bg: string;
  text: string;
}
