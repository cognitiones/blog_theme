"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node.ts
var node_exports = {};
__export(node_exports, {
  clearMatterContent: () => clearMatterContent,
  defineConfig: () => defineConfig,
  getDefaultTitle: () => getDefaultTitle,
  getThemeConfig: () => getThemeConfig
});
module.exports = __toCommonJS(node_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_gray_matter = __toESM(require("gray-matter"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
function getThemeConfig(cfg) {
  const srcDir = cfg?.srcDir || ".";
  const files = import_fast_glob.default.sync(`${srcDir}/**/*.md`, { ignore: ["node_modules"] });
  const data = files.map((v) => {
    let route = v.replace(".md", "");
    if (route.startsWith("./")) {
      route = route.replace(
        new RegExp(
          `^\\.\\/${import_path.default.join(srcDir, "/").replace(new RegExp(`\\${import_path.default.sep}`, "g"), "/")}`
        ),
        ""
      );
    } else {
      route = route.replace(
        new RegExp(
          `^${import_path.default.join(srcDir, "/").replace(new RegExp(`\\${import_path.default.sep}`, "g"), "/")}`
        ),
        ""
      );
    }
    const fileContent = import_fs.default.readFileSync(v, "utf-8");
    const meta = {
      ...(0, import_gray_matter.default)(fileContent).data
    };
    if (!meta.title) {
      meta.title = getDefaultTitle(fileContent);
    }
    meta.tag = (meta.tag || []).concat([
      .../* @__PURE__ */ new Set([...meta.categories || [], ...meta.tags || []])
    ]);
    const wordCount = 100;
    meta.description = meta.description || getTextSummary(fileContent, wordCount);
    meta.cover = meta.cover || fileContent.match(/[!]\[.*?\]\((https:\/\/.+)\)/)?.[1] || "";
    return {
      route: `/${route}`,
      meta
    };
  }).filter((v) => v.meta.layout !== "home");
  return {
    blog: {
      pagesData: data,
      ...cfg
    },
    sidebar: [
      {
        text: "",
        items: []
      }
    ]
  };
}
function getDefaultTitle(content) {
  const title = clearMatterContent(content).split("\n")?.find((str) => {
    return str.startsWith("# ");
  })?.slice(2).replace(/[\s]/g, "") || "";
  return title;
}
function clearMatterContent(content) {
  let first___;
  let second___;
  const lines = content.split("\n").reduce((pre, line) => {
    if (!line.trim() && pre.length === 0) {
      return pre;
    }
    if (line.trim() === "---") {
      if (first___ === void 0) {
        first___ = pre.length;
      } else if (second___ === void 0) {
        second___ = pre.length;
      }
    }
    pre.push(line);
    return pre;
  }, []);
  return lines.slice(second___ || 0).join("\n");
}
function getTextSummary(text, count = 100) {
  return clearMatterContent(text).match(/^# ([\s\S]+)/m)?.[1]?.replace(/#/g, "")?.replace(/!\[.*?\]\(.*?\)/g, "")?.replace(/\[(.*?)\]\(.*?\)/g, "$1")?.replace(/\*\*(.*?)\*\*/g, "$1")?.split("\n")?.filter((v) => !!v)?.slice(1)?.join("\n")?.replace(/>(.*)/, "")?.slice(0, count);
}
function defineConfig(config) {
  return config;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearMatterContent,
  defineConfig,
  getDefaultTitle,
  getThemeConfig
});
