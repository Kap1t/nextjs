import type { NextApiRequest, NextApiResponse } from "next";

export interface ITechnology {
  _id: string;
  ref: string;
  title: string;
  imageRef: string;
  description: string;
}

export const technology: ITechnology[] = [
  {
    _id: "1",
    ref: "javascript",
    title: "JavaScript",
    imageRef: "/static/react.png",
    description:
      "Мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript.",
  },
  {
    _id: "2",
    ref: "react",
    title: "React",
    imageRef: "/static/react.png",
    description:
      "React.js — это JavaScript-библиотека для разработки пользовательского интерфейса.",
  },
  {
    _id: "3",
    ref: "nextjs",
    title: "NextJs",
    imageRef: "/static/react.png",
    description:
      "Next.js — открытый JavaScript фреймворк, созданный поверх React.js для создания веб-приложений...",
  },
  {
    _id: "4",
    ref: "typescript",
    title: "TypeScript",
    imageRef: "/static/react.png",
    description:
      "TypeScript — язык программирования, представленный Microsoft в 2012 году и позиционируемый как средство",
  },
];

export default function topics(req: NextApiRequest, res: NextApiResponse<ITechnology[]>) {
  if (req.method === "GET") {
    res.status(200).json(technology);
  }
}
