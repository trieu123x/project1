import React, { use, useEffect, useState ,useMemo} from "react";
import { useLocation } from "react-router-dom";


export async function handleBuy(product) {
    const userId = localStorage.getItem("userId")
    alert("mua hang thanh cong")
    const res = await fetch(`https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user/${userId}`)
    const user = await res.json();
    const newOrder = {
        ...product, date: new Date().toLocaleString()
        
    }
    const updated = {
        ...user,
        order: [...(user.order || []), newOrder],
    };

    await fetch(`https://68a1ffce6f8c17b8f5db45c7.mockapi.io/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
    });

}
