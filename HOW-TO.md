# How-to

This app is built on schemas and generators. Generally, when you're making changes, you should either be editing `app/core` code, OR editing a schema/template and then running scripts.

## Add or update a model

- Make changes to `schema.prisma`
- Run `blitz prisma generate` (or `yarn generate`)
- What does this do?
  - Updates the database structure.
  - Generates the prisma client.
  - Generates JSON schema for dynamic tables and form layouts.
  - Generates Zod schema for mutation validation.

## Update a template

- Make changes to a file in the `/templates` folder. (See [docs](https://blitzjs.com/docs/templates).)
- Run `blitz generate crud [model]`
- Run `blitz generate pages [model]`
- What does this do?
  - Generates queries and mutations for the model.
  - Generates listing, detail, create, and edit pages for the model.

## Custom Schema Rules

### Magic Field names

- A numeric `id` property for each model is expected.
- A string property named either `label`, `name`, `title`, or `id` (in this priority order) will be used in reference labels.

### Metadata

This app expects specific code comments in the `schema.prisma` file and creates dynamic behavior based on them.

- Each comment should be in a JSON structure.
- Each metadata comment will be attached to the property on the next line.
- The "id" property is also used to reveal some things about the whole model itself.

#### Metadata model fields

- `adminMenu`: Displays the model in the Admin Menu, when set to `true` (on the `id` property).

#### Metadata property fields

- `column`: Displays the property as a column in the listing table, when set to `true`.
- `searchable`: Uses the property as a searchable field in the listing table, when set to `true`.
  - If no fields on the model are marked as `searchable`, the search bar will not be shown.
- `multiline`: Uses a multiline form field in create/edit screens, when set to `true`.
- `relation`: Informs the layout of a model reference when applied to a relation id property.
  - Note: Automating and deprecating this a priority.

```
model Animal {
  /// { "adminMenu": true }
  id Int @id @default(autoincrement())
  /// { "column": true, "searchable": true }
  name String
  /// { "multiline": true, "searchable": true }
  description String
  /// { "relation": "owner" }
  ownerId Int?

  owner Owner? @relation(fields: [ownerId], references: [id])
}
```
