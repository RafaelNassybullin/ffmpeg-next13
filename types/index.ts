import { Card } from "@prisma/client";

export interface CardType extends Card {
  views: { count: number };
  count?: number
}