debounce = function(fn, delay){
  var handle;
  return function() {
    window.clearInterval(handle);
    handle = setTimeout(function() {
      fn();
    },delay);
  }
}

getSuggest = function() {
  ajax('get','/src/13_mall/api/suggest.json',function(resp) {

    let array = resp.data;
    let suggestList = document.getElementById('search-suggest');
    let str = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<li>${element.suggestname}</li>`;
    }
    suggestList.innerHTML = str;
  },true);
}

getSwiper = function() {
  ajax('get','/src/13_mall/api/swiper.json',function(resp) {
    let array = resp.data;
    let swiper = document.getElementById('swiper');
    let str = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<li class="swiper-item"><a href=""><img src="${element.banner_img}" alt=""></a></li>`
    }
    swiper.innerHTML = str;
    let indicators = document.getElementById('indicators');
    let str2 = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(index == 0) {
        str2 += `<div class="indicator" data-index="${index}"></div>`
      } else {
        str2 += `<div class="indicator on" data-index="${index}"></div>`
      }
    }
    indicators.innerHTML = str2;
    this.initBanner();

  },true);
}

function initBanner() {
  var swiper = document.getElementById("swiper"); //获取轮播图包裹层元素
  var swiperItem = swiper.getElementsByClassName("swiper-item"); //获取轮播图列表
  var prev = document.getElementsByClassName("prev")[0]; //获取上一张按钮
  var next = document.getElementsByClassName("next")[0]; //获取下一张按钮
  var indicators = document.getElementsByClassName("indicator"); //获取圆点列表
  var index = 0; //当前轮播图索引，默认第一张
  var timer = null; //定时器

  //设置轮播图的透明度和位移
  for (var i = 0; i < swiperItem.length; i++) {
    if (index == i) {
      swiperItem[i].style.opacity = 1;
    } else {
      swiperItem[i].style.opacity = 0;
    }
    swiperItem[i].style.transform =
      "translateX(" + -i * swiperItem[0].offsetWidth + "px)";
  }

  //给圆点添加点击事件
  for (var k = 0; k < indicators.length; k++) {
    indicators[k].onclick = function () {
      clearInterval(timer);
      var clickIndex = parseInt(this.getAttribute("data-index"));
      index = clickIndex;
      changeImg();
    };
  }

  prev.onclick = function () {
    clearInterval(timer);
    index--;
    changeImg();
  };

  next.onclick = function () {
    clearInterval(timer);
    index++;
    changeImg();
  };

  //鼠标经过停止播放
  swiper.addEventListener(
    "mouseover",
    function () {
      clearInterval(timer);
    },
    false
  );

  //鼠标移出后自动播放
  swiper.addEventListener(
    "mouseout",
    function () {
      autoChange();
    },
    false
  );

  //更换图片
  function changeImg() {
    if (index < 0) {
      index = swiperItem.length - 1;
    } else if (index > swiperItem.length - 1) {
      index = 0;
    }
    for (var j = 0; j < swiperItem.length; j++) {
      swiperItem[j].style.opacity = 0;
    }
    swiperItem[index].style.opacity = 1;
    setIndicatorOn();
  }

  //设置圆点激活状态
  function setIndicatorOn() {
    for (var i = 0; i < indicators.length; i++) {
      indicators[i].classList.remove("on");
    }
    indicators[index].classList.add("on");
  }

  autoChange();
  //自动播放
  function autoChange() {
    timer = setInterval(function () {
      index++;
      changeImg();
    }, 3000);
  }

}

getMiaosha = function() {
  ajax('get','/src/13_mall/api/miaosha.json',function(resp) {
    let time = resp.data.ms_time;
    countDown(time);
    let array = resp.data.goods_list;
    
    let miaosha_list = document.getElementById('miaoshaList');
    let str = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<div class="ms-item">
                <a href="#" class="ms-item-lk">
                    <img src="${element.good_img}" alt="" class="ms-item-img">
                    <p class="ms-item-name">${element.name}</p>
                    <div class="ms-item-buy">
                        <span class="progress"><span class="progress-bar" style="width:${element.progress}%"></span></span>
                        <span class="buy-num">已抢${element.progress}%</span>
                    </div>
                    <div class="ms-item-price clearfix">
                        <span class="cm-price new-price">￥${element.new_price}</span>
                        <span class="cm-price origin-price">￥${element.old_price}</span>
                    </div>
                </a>
            </div>`
    }
    miaosha_list.innerHTML = str;

  },true);
}

//秒杀倒计时
function countDown(t) {
  var ms_time = t;
  var ms_timer = setInterval(function () {
    if (ms_time < 0) {
      clearInterval(ms_timer);
    } else {
      calTime(ms_time);
      ms_time--;
    }
  }, 1000);
}

//计算时间
function calTime(time) {
  var hour = Math.floor(time / 60 / 60); //小时
  var minutes = Math.floor((time / 60) % 60); //分钟
  var seconds = Math.floor(time % 60); //秒
  hour = formatTime(hour);
  minutes = formatTime(minutes);
  seconds = formatTime(seconds);
  document.getElementsByClassName("cd_hour")[0].innerHTML = hour;
  document.getElementsByClassName("cd_minute")[0].innerHTML = minutes;
  document.getElementsByClassName("cd_second")[0].innerHTML = seconds;
}
//格式化时间，小与10，拼接0
function formatTime(t) {
  if (t < 10) {
    t = "0" + t;
  }
  return t;
}

getHotsale = function() {
  ajax('get','/src/13_mall/api/hotsale.json',function(resp) {
    let array = resp.data;
    let hotSaleList = document.getElementById('hotSaleList');
    let str = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<li class="bs-item item">
                <a href="">
                    <img src="${element.good_img}" alt="" class="item-img">
                    <p class="title">${element.name}</p>
                    <div class="line-2 clearfix">
                        <span class="comment">评论<em>${element.commentNum}</em></span>
                        <span class="collect">收藏<em>${element.collectNum}</em></span>
                    </div>
                    <div class="line-3">
                        <span class="strong">${element.new_price}</span>
                        <span class="price-through">￥${element.old_price}</span>
                        <span class="sell">月销${element.saleNum}笔</span>
                    </div>
                </a>
            </li>`
    }
    hotSaleList.innerHTML = str;
  },true);
}

getGuessLike = function(append) {
  ajax('get','/src/13_mall/api/guesslike.json',function(resp) {
    let array = resp.data;
    let guesslike = document.getElementById('gl');
    let str = '';
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<li class="like-item item">
                <a href="">
                    <img src="${element.good_img}" alt="" class="item-img">
                </a>
                <p class="title">${element.name}</p>
                <div class="line-3">
                    <span class="strong">${element.new_price}</span>
                    <span class="sell">月销${element.saleNum}笔</span>
                </div>
                <a href="" class="item-more">发现更多相似的宝贝</a>
            </li>`
    }
    if(append) {
      guesslike.innerHTML = guesslike.innerHTML + str;
    } else {
      guesslike.innerHTML = str;
    }
  },true);
}

function showKeyword() {
  if (searchInput.value !== "") {
    document.getElementById("search-suggest").style.display = "block";
  }
}

function hideKeyword() {
  document.getElementById("search-suggest").style.display = "none";
}

window.onload = function () {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", debounce(getSuggest,500), false);
  searchInput.addEventListener("blur", hideKeyword, false);
  searchInput.addEventListener("focus", showKeyword, false);
  getSwiper();
  getMiaosha();
  getHotsale();
  getGuessLike(false);

  var loadMoreBtn = document.getElementById("loadMore");
  loadMoreBtn.onclick =function() {
    getGuessLike(true);
  }
  
};


window.onscroll = function () {
  scrollShowBtn();
  var winPos = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动的距离
  var hotSale = document.getElementById("hotsale"); //获取热卖专区元素
  var hotHeight = hotSale.offsetTop + hotSale.offsetHeight; //猜你喜欢之前的总高度

  if (winPos < hotSale.offsetTop) {
    addOn(0);
  } else if (winPos >= hotSale.offsetTop && winPos < hotHeight) {
    addOn(1);
  } else {
    addOn(2);
  }
};

//添加菜单激活状态
function addOn(index) {
  var tool = document.getElementsByClassName("tool")[0];
  var toolItem = tool.getElementsByTagName("a");
  for (var i = 0; i < toolItem.length; i++) {
    toolItem[i].classList.remove("on");
  }
  toolItem[index].classList.add("on");
}

//滚动一定距离显示返回顶部按钮
function scrollShowBtn() {
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 300) {
    document.getElementById("goTop").style.display = "block";
  } else {
    document.getElementById("goTop").style.display = "none";
  }
}

//返回顶部
function goTop() {
  var topTimer = setInterval(function () {
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var iSpeed = Math.floor(-scrollTop / 8);
    if (scrollTop == 0) {
      clearInterval(topTimer);
    }
    document.documentElement.scrollTop = document.body.scrollTop =
      scrollTop + iSpeed;
  }, 30);
};