import exec_content from "./data/exec";
import hash_content from "./data/hash";
import jobs_content from "./data/jobs";

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
    }
];
  
export default ShellTipsPosts;
