import { Route } from "@/types/routes.type";
import { Utensils } from "lucide-react";

export const providerRoutes:Route[]=[
  {
    title:"Provider Management",
    items:[
     {
         title: "Menu",
        url: "/menu",
        icon: Utensils,
     }
    ]
  }
]