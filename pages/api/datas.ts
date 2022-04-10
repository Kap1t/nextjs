import type { NextApiRequest, NextApiResponse } from "next";

export interface Data {
  header: string;
  content: {
    text?: string;
    code?: string;
  }[];
}

const arrays: Data[] = [
  {
    header: "map",
    content: [
      { text: "Метод arr.map является <b>одним</b> из наиболее полезных и часто используемых." },
      {
        text: "Он вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.",
      },
      {
        code: `let lengths = ["Bilbo", "Gandalf", "Nazgul"].map((item) => item.length);
alert(lengths); // 5,7,6`,
      },
    ],
  },
  {
    header: "foreEach",
    content: [
      { text: "Метод arr.forEach позволяет запускать функцию для каждого элемента массива." },
      {
        code: `// Вызов alert для каждого элемента
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);`,
      },
    ],
  },
  {
    header: "slice",
    content: [
      {
        text: "Он возвращает новый массив, в который копирует элементы, начиная с индекса start и до end (не включая end). Оба индекса start и end могут быть отрицательными. В таком случае отсчёт будет осуществляться с конца массива.",
      },
      {
        code: `let arr = ["t", "e", "s", "t"]; let arr = ["t", "e", "s", "t"];
alert( arr.slice(1, 3) ); // e,s (копирует с 1 до 3)
alert( arr.slice(-2) ); // s,t (копирует с -2 до конца)`,
      },
      {
        text: "Можно вызвать slice и вообще без аргументов: arr.slice() создаёт копию массива arr.",
      },
    ],
  },
  {
    header: "reduce/reduceRight",
    content: [
      {
        text: "Методы arr.reduce и arr.reduceRight используются для вычисления какого-нибудь единого значения на основе всего массива.",
      },
      {
        code: `let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => {
  sum + current, 0);
}
alert(result); // 15`,
      },
    ],
  },
];

export default function datas2(req: NextApiRequest, res: NextApiResponse<Data[]>) {
  if (req.method === "GET") {
    res.status(200).json(arrays);
  }
}
