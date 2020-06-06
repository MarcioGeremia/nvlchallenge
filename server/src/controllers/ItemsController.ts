import knex from "../database/connection";
import map from "lodash/map";
import { Request, Response } from "express";

class ItemsController {
  async create(req: Request, resp: Response) {
    const items = await knex("items").select("*");

    return resp.json(
      map(items, (item) => {
        return {
          ...item,
          image_url: `http://192.168.0.108:3333/uploads/${item.image}`,
        };
      })
    );
  }
}

export default ItemsController;
