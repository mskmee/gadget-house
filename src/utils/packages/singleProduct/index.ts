import { SingleProductAPI } from "./singleProduct-api";
import { SingleProductService } from "./singleProduct-service";

const singleProsuctApi = new SingleProductAPI();
const singleProductService = new SingleProductService(singleProsuctApi);

export { singleProductService}