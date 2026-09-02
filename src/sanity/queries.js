import { readClient, isSanityConfigured } from './client';

export async function getApprovedTestimonials() {
  if (!isSanityConfigured) return null;

  try {
    return await readClient.fetch(
      `*[_type == "testimonial" && approved == true] | order(order asc) {
        name,
        company,
        text,
        rating
      }`
    );
  } catch {
    return null;
  }
}
