import React from "react";
import { MdOutlineHttp } from "react-icons/md";
import { TbHttpDelete, TbHttpGet, TbHttpPost, TbHttpPut } from "react-icons/tb";

import { getRequestColorClass } from "@/components/screens/requests/helpers";
import { cn } from "@/lib/utils";
import { Method } from "@prisma/client";

type Props = {
  method?: Method | string | undefined;
  className?: string;
};

export default function RequestIcon({ method, className }: Props) {
  const getIcon = (m: Props["method"]) => {
    switch (m) {
      case "GET":
        return (
          <TbHttpGet
            className={cn("!w-6 !h-6", className, getRequestColorClass(m))}
          />
        );
      case "POST":
        return (
          <TbHttpPost
            className={cn("!w-6 !h-6", className, getRequestColorClass(m))}
          />
        );
      case "PUT":
        return (
          <TbHttpPut
            className={cn("!w-6 !h-6", className, getRequestColorClass(m))}
          />
        );
      case "DELETE":
        return (
          <TbHttpDelete
            className={cn("!w-6 !h-6", className, getRequestColorClass(m))}
          />
        );
      default:
        return (
          <MdOutlineHttp
            className={cn("w-6 h-6", className, getRequestColorClass(m))}
          />
        );
    }
  };

  return <>{getIcon(method)}</>;
}
