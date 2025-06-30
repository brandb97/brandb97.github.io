const ShellTipsPosts = [
    {
      title: "exec",
      content: (<>
        <p>exec命令用来执行一个新的命令，并替换当前的shell进程。</p>
        <p>使用exec可以避免创建新的子进程，从而提高效率。</p>
      </>),
    },
    {
      title: "hash",
      content: (<>
        <p>hash命令用来缓存命令的路径，以加快后续的查找速度。</p>
      </>),
    },
];
  
export default ShellTipsPosts;