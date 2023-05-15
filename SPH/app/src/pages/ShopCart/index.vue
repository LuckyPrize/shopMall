<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateCartchecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', $event.target.value * 1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', $event.target.value * 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllcheck"
          @click="changeAllCheck($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllcart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a
            class="sum-btn"
            href="###"
            target="_blank"
            @click.prevent="$router.push('/trade')"
            >结算</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取购物车详情的函数封装
    getData() {
      this.$store.dispatch("shopcart/getShopCartInfo");
    },
    // 给全选功能实现控制上面所选商品的状态
    changeAllCheck(e) {
      let allCheck = e.target.checked;
      // console.log(allCheck);
      // this.getData();
      this.cartInfoList.forEach(async (cart) => {
        // console.log(cart);
        try {
          await this.$store.dispatch("shopcart/updateCartbyID", {
            skuId: cart.skuId,
            isChecked: allCheck ? 1 : 0,
          });
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      });
    },
    handler: throttle(async function (type, disNum, cart) {
      switch (type) {
        case (type = "mins"):
          disNum = cart.skuNum <= 1 ? 0 : -1;
          break;
        case (type = "add"):
          disNum = 1;
          break;
        case (type = "change"):
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum - cart.skuNum);
          }
          break;
      }
      // console.log(type, disNum, cart);
      try {
        await this.$store.dispatch("detail/AddorUpdateShopcart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
      } catch (error) {
        alert(error.message);
      }

      this.getData();
    }, 500),
    // 删除商品
    async deleteCart(cart) {
      // 删除原始写法
      // try {
      //   await this.$store.dispatch("shopcart/deleteCartbyID", cart.skuId);
      //   this.getData();
      // } catch (error) {
      //   alert(error.message);
      // }

      // 调用封装的删除函数写法
      this.deleteSelect(cart.skuId);
    },
    // 改变购物车商品状态
    async updateCartchecked(cart) {
      try {
        await this.$store.dispatch("shopcart/updateCartbyID", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中的商品
    deleteAllcart() {
      let deleteList = this.cartInfoList.filter((cart) => {
        return cart.isChecked == 1;
      });
      deleteList.forEach(async (del) => {
        // 删除原始写法
        //   try {
        //     await this.$store.dispatch("shopcart/deleteCartbyID", del.skuId);
        //     this.getData();
        //   } catch (error) {
        //     alert(error.message);
        //   }
        // });

        // 调用封装删除函数写法
        this.deleteSelect(del.skuId);
      });
    },
    // 删除购物车选中商品函数的封装
    async deleteSelect(skuId) {
      try {
        await this.$store.dispatch("shopcart/deleteCartbyID", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters("shopcart", ["shopList"]),
    cartInfoList() {
      return this.shopList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((cart) => {
        // console.log(cart);
        sum += cart.skuPrice * cart.skuNum;
      });
      return sum.toFixed(2);
    },
    isAllcheck() {
      return this.cartInfoList.every(
        (cart) => cart.isChecked == 1
        // console.log(cart);
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>