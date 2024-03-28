"use client"

import { useState } from "react";
import LinkButton from "./LinkButton";

export default function VideoNav(props: { home: { description: string } }) {
  const [page, setPage] = useState<String>("home");

  const handlePage = (target: string) => {
    const op = {
      home: () => {
        setPage("home");
      },
      about: () => {
        setPage("about");
      }
    } as { [key: string]: any };
    op[target]();
  };

  return (
    <section className="min-h-80">
      <nav className={`flex border-b-[1px] gap-3 border-gray-100`}>
        <LinkButton
          content="HOME"
          variant={`${page === "home" ? "active" : "default"}`}
          onClick={() => {
            handlePage("home");
          }}
        />

        <LinkButton
          content="ABOUT"
          variant={`${page === "home" ? "default" : "active"}`}
          onClick={() => {
            handlePage("about");
          }}
        />
      </nav>
      {page == "home" && (
        <div>
          <h1>Home</h1>
          <p>
            {props.home.description}
          </p>
        </div>
      )}
      {page == "about" && <div>About</div>}
    </section>
  );
}
