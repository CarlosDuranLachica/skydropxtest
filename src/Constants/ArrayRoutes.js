import RegisterPackage from "../Views/RegisterPackage";
import SelectPackageService from "../Views/SelectPackageService";
import VoucherPDF from "../Views/VoucherPDF";
import Error from "../Views/Error";

const ArrayRoutes = [
  {
    path: "/",
    children: <RegisterPackage />,
  },
  {
    path: "/SelectPackageService",
    children: <SelectPackageService />,
  },
  {
    path: "/VoucherPDF",
    children: <VoucherPDF />,
  },
  {
    path: "/Error",
    children: <Error />,
  },
];

export default ArrayRoutes;
