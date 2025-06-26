import { JSX } from "react";
import { Grid2x2, CaseUpper } from "lucide-react";

export type Algorithm = {
  id: string;
  title: string;
  description: string;
  type: "Symmetric" | "Asymmetric";
  icon: JSX.Element;
  link: string;
};

export const algorithms: Algorithm[] = [
  {
    id: "caesar-cipher",
    title: "Caesar Cipher",
    description:
      "A method in which each letter in the message is replaced by a letter with some fixed number of positions down the alphabet.",
    type: "Symmetric",
    icon: (
      <svg
        className="h-6 w-6 fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          d="M50,10 C72,10, 90,30, 90,50 C90,70, 72,90, 50,90 C28,90, 10,70, 10,50 C10,30, 28,10, 50,10 Z"
          stroke="white"
          fill="none"
          strokeWidth="8"
        />
        <path
          d="M50,35 C60,35, 65,45, 65,50 C65,55, 60,65, 50,65 C40,65, 35,55, 35,50 C35,45, 40,35, 50,35 Z"
          stroke="white"
          fill="none"
          strokeWidth="8"
        />
      </svg>
    ),
    link: "/symmetric/caesar-cipher",
  },
  {
    id: "elgamal",
    title: "El-Gamal Algorithm",
    description:
      "El-Gamal is a public-key used for secure data encryption and key exchange based on the discrete logarithm problem.",
    type: "Asymmetric",
    icon: <CaseUpper className="w-6 h-6" />,
    link: "/asymmetric/el-gamal",
  },
];
