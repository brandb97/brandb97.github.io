import exec_content from "./data/exec";
import hash_content from "./data/hash";
import jobs_content from "./data/jobs";
import script_content from "./data/script";
import case_content from "./data/case";
import symbol_content from "./data/symbol";

const ShellTipsPosts = [
    {
        title: "exec",
        content: exec_content(),
    },
    {
        title: "hash",
        content: hash_content(),
    },
    {
        title: "任务管理",
        content: jobs_content(),
    },
    {
        title: "script",
        content: script_content(),
    },
    {
        title: "case",
        content: case_content(),
    },
    {
        title: "$@#!?",
        content: symbol_content(),
    },
];
  
export default ShellTipsPosts;
