import knex from "../database/connection";
import map from "lodash/map";
import { Request, Response } from "express";

class PointsController {
  async show(req: Request, resp: Response) {
    const {
      params: { id },
    } = req;

    const point = await knex("points").where("id", id).first();
    if (!point) return resp.status(400).json("Point Not Found!");

    const items = await knex("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return resp.json({ ...point, items });
  }

  async create(req: Request, resp: Response) {
    const {
      body: { name, email, whatsapp, latitude, longitude, city, uf, items },
    } = req;

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    // Cria uma transection para criar um escopo e não fazer as ações atomicas
    const trx = await knex.transaction();

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = map(items, (item_id: number) => {
      return { item_id, point_id };
    });

    await trx("points_items").insert(pointItems);

    await trx.commit();

    const itemsBanco = await knex("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", point_id)
      .select("items.title");

    return resp.json({ id: point_id, ...point, items: itemsBanco });
  }

  async index(req: Request, resp: Response) {
    const {
      query: { city, uf, items },
    } = req;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("points_items", "points.id", "=", "points_items.point_id")
      .whereIn("points_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return resp.json(points);
  }
}

export default PointsController;
