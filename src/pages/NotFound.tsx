import { ReactElement } from "react";

import { ErrorTemplate } from "../components";

export const NotFound = (): ReactElement => (
  <ErrorTemplate errorCode={404} title="Страница не найдена" />
);
