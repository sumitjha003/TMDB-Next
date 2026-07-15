"use server";

import { revalidatePath } from "next/cache";
import { ROUTES } from "../constants/routes";

export async function revalidateMovies() {
  revalidatePath(ROUTES.MOVIES);
}

export async function revalidatePerson() {
  revalidatePath(ROUTES.PERSON);
}
