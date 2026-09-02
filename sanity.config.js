import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import testimonialSchema from './src/sanity/schemas/testimonial';
import contactSubmissionSchema from './src/sanity/schemas/contactSubmission';

export default defineConfig({
  name: 'portfolio',
  title: 'Портфолио — Александра Петрова',

  projectId: 'fbjqkx2p',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Управление сайтом')
          .items([
            S.listItem()
              .title('Отзывы')
              .child(
                S.list()
                  .title('Отзывы')
                  .items([
                    S.listItem()
                      .title('✅ Опубликованные')
                      .child(
                        S.documentList()
                          .title('Опубликованные отзывы')
                          .filter('_type == "testimonial" && approved == true')
                      ),
                    S.listItem()
                      .title('⏳ На модерации')
                      .child(
                        S.documentList()
                          .title('Ожидают проверки')
                          .filter('_type == "testimonial" && approved != true')
                      ),
                  ])
              ),
            S.listItem()
              .title('Заявки с сайта')
              .child(
                S.documentList()
                  .title('Новые заявки')
                  .filter('_type == "contactSubmission"')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
          ]),
    }),
  ],

  schema: {
    types: [testimonialSchema, contactSubmissionSchema],
  },
});
