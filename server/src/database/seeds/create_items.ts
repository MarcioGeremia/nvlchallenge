import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "Lâmpadas", image: "lampadas.svg" },
    { title: "Pilhas e Baterias", image: "baterias.svg" },
    { title: "Papéis e papelão", image: "papeis-papelao.svg" },
    { title: "Resíduos Eletronicos", image: "eletronicos.svg" },
    { title: "Resíduos Orgânicos", image: "organicos.svg" },
    { title: "Oleo de Cozinha", image: "oleo.svg" },
  ]);
}