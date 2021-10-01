import { repository } from "../repositories/repositories.js";

export default (context, inject) => {
  inject('repository', repository(context.$axios));
}
