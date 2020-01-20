import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import jsCookie from "js-cookie";
import Router from "next/router";

export default function AdminIndex() {
  const userlogin = JSON.parse(jsCookie.get("userlogin") || null);
  const tileData = [
    {
      img: "/static/images/01.jpg",
      title: "文章",
      author: "日常分享内容编辑",
      to: "/admin/editor",
      params: {
        entry: "article"
      }
    },
    {
      img: "/static/images/02.jpg",
      title: "简介",
      author: "个人简历编辑",
      to: "/admin/editor",
      params: {
        entry: "userinfo"
      }
    },
    {
      img: "/static/images/03.jpg",
      title: "标签",
      author: "个性标签维护"
    },
    {
      img: "/static/images/04.jpg",
      title: "首页",
      author: "回到首页",
      to: "/"
    }
  ];

  useEffect(() => {
    Router.beforePopState(({ as }) => {
      window.location.href = as;
      window.location.reload();
    });
  }, []);

  const handleClick = obj => {
    if (!obj["to"]) return;
    Router.push({
      pathname: obj["to"],
      query: obj["params"]
    });
  };
  const useStyles = () => {
    return makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        width: 500,
        height: 450
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    }));
  };
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width: "480px", margin: "auto" }}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">
            你好，{userlogin && userlogin["username"]}
          </ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img} onClick={() => handleClick(tile)}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
