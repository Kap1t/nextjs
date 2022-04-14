import type { NextApiRequest, NextApiResponse } from "next";

export interface Topic {
  header: string;
  list: {
    name: string;
    ref: string;
  }[];
}

const topic: Topic[] = [
  {
    header: "Основы JavaScrip",
    list: [
      { name: "Методы массивов", ref: "arrays" },
      { name: "Объекты", ref: "objects" },
      { name: "Методы массивов", ref: "arrays" },
      { name: "Объекты", ref: "objects" },
      { name: "Методы массивов", ref: "arrays" },
      { name: "Объекты", ref: "objects" },
      { name: "Методы массивов", ref: "arrays" },
      { name: "Объекты", ref: "objects" },
    ],
  },
  {
    header: "Продвинутая работа с функциями",
    list: [
      { name: "Функции", ref: "functions" },
      { name: "Замыкания", ref: "closure" },
    ],
  },
  {
    header: "Классы",
    list: [
      { name: "Класс: базовый синтаксис", ref: "class" },
      { name: "Наследование классов", ref: "class-inheritance" },
    ],
  },
];

export default function topics(req: NextApiRequest, res: NextApiResponse<Topic[]>) {
  if (req.method === "GET") {
    // const topic = topicsArr.find((item) => req.body === item);
    res.status(200).json(topic);
  }
}
