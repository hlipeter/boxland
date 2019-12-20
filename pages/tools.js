import React from "react";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import Link from "next/link";
import Main from "../layouts/main";
// import fetch from "../public/js/nextFetch";
// import styled from "../public/less/detail.less";
import Empty from "../components/empty";

export default function Tool(props) {
  const { initbiz } = props;
  const styled = {};
  return (
    <Main>
      {false ? (
        <Grid container spacing={1}>
          <Grid item className="tool-item" xs={12} sm={6} md={4}>
            <img src="/images/imagine.png" alt="" />
            <div className={styled.tips}>
              当前blog简介、开发目的、流程、以及最终成型上线等。
            </div>
            <div className={styled.toolHead}>
              <span>blog站点</span>
              <Link href="tools-pro?toolId=1">
                <em>详情</em>
              </Link>
            </div>
          </Grid>
          <Grid item className="tool-item" xs={12} sm={6} md={4}>
            <img src="/images/yinxiang.png" alt="" />
            <div className={styled.tips}>
              私人日记、提供一个线下日记的编辑平台，并保存在本地
            </div>
            <div className={styled.toolHead}>
              <span>日记编辑</span>
              <Link href="tools-pro?toolId=2">
                <em>详情</em>
              </Link>
            </div>
          </Grid>
          <Grid item className="tool-item" xs={12} sm={6} md={4}>
            <img src="/images/pc.png" alt="" />
            <div className={styled.tips}>
              doc文件转换成html文件，设备信息统计，如：CPU、内存、网络、电量、存储空间等
            </div>
            <div className={styled.toolHead}>
              <span>文档转换器</span>
              <Link href="tools-pro?toolId=3">
                <em>详情</em>
              </Link>
            </div>
          </Grid>
          <Grid item className="tool-item" xs={12} sm={6} md={4}>
            <img src="/images/more.png" alt="" />
            <div className={styled.tips}>
              想象一下必要但还不够成熟的工具，尝试更多挑战
            </div>
            <div className={styled.toolHead}>
              <span>后期拓展</span>
              <Link href="tools-pro?toolId=4">
                <em>详情</em>
              </Link>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Empty tips="正在升级中..." />
      )}
    </Main>
  );
}
