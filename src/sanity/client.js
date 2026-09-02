import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

// Клиент только для чтения (публичный — для фетча отзывов)
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Клиент с правом записи — только на сервере (для API endpoint)
export function getWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: import.meta.env.SANITY_API_TOKEN,
  });
}

export const isSanityConfigured = Boolean(projectId);
