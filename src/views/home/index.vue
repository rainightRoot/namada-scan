<template>
  <div class="home">
    <div class="search-box">
      <div class="inp-box">
        <div class="icon-search"></div>
        <el-input v-model="keyword" class="input-search" placeholder="Height/Transaction"></el-input>
      </div>
      <div class="btn-search" @click="search">Search</div>

    </div>

    <div class="big-card">
      <div class="title">Overview</div>
      <div class="content">
        <el-row :gutter="24">

          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Block Height</span></div>
              <div class="value-box">
                <div class="value">{{ lastInfo.header?.height }}</div>
                <div class="icon-2"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Validators</span></div>
              <div class="value-box">
                <div class="value">{{ validatorsTotal }}</div>
                <div class="icon-3"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Total Stake</span></div>
              <div class="value-box">
                <div class="value">{{ formatPrice(voting_power) }}</div>
                <div class="icon-5"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Chain ID</span></div>
              <div class="value-box">
                <div class="value">{{ lastInfo.header?.chain_id }}</div>
                <div class="icon-6"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="big-card">
      <div class="title">Top Validators <span class="more" @click="gotoVlist">View More >></span></div>
      <div class="content">
        <div class="table-box">

          <table class="table">
            <tr class="th">
              <th class="td"><span class="bg-yellow">Rank</span></th>
              <th class="td"><span class="bg-yellow">Validator</span></th>
              <th class="td"><span class="bg-yellow">Voting Power</span></th>
              <!-- <th class="td"><span class="bg-yellow">Uptime</span></th>
              <th class="td"><span class="bg-yellow">Signed Blocks</span></th>
              <th class="td"><span class="bg-yellow">Last Seen at</span></th>
              <th class="td"><span class="bg-yellow">State</span></th> -->
            </tr>
            <tbody class="tbody">
              <tr v-for="item, i in validatorsList.slice(0, 10)" :key="i" class="tr">
                <td class="td">{{ i + 1 }}</td>
                <td class="td">
                  <!-- <p>Home Decor Range</p> -->
                  <p class="">{{ shortStr(item.address) }}</p>
                </td>
                <td class="td">
                  <p>{{ formatPrice(item.voting_power) }}</p>
                  <p>{{ ((item.voting_power / voting_power) * 100).toFixed(2) }}%</p>
                </td>
                <!-- <td class="td">100 %</td>
                <td class="td">111,130,123</td>
                <td class="td">333,330,123</td>
                <td class="td">Consensus</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { last, validators } from '@/api/namada'
export default {
  data() {
    return {
      keyword: '',
      lastInfo: {},
      validatorsList: [],
      validatorsTotal: 0,
      voting_power: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    search() {
      if (!this.keyword) {
        return
      }
      if (isNaN(this.keyword)) { // tx
        this.$router.push('/tx/' + this.keyword)
      } else { // height
        this.$router.push('/block/' + this.keyword)
      }
    },
    init() {
      this.last()
      this.validators()
    },
    shortStr(text) {
      return text.slice(0, 8) + '...' + text.slice(-7);
    },
    last() {
      last().then(res => {
        this.$set(this, 'lastInfo', res)
      })
    },
    gotoVlist() {
      this.$router.push('/validators')
    },
    formatPrice(price) {
      return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    validators() {
      validators({
        count: 10
      }).then(res => {
        this.validatorsList = res.result.validators
        this.validatorsTotal = res.result.total
        this.voting_power = BigNumber(0)
        res.result.validators.map(item => item.voting_power).forEach((item) => (this.voting_power = this.voting_power.plus(BigNumber(item))))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.big-card {
  background: #fff;
  margin: 20px 0;
  padding: 20px 20px 0;
  border-radius: 4px;

  .title {
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .more {
      color: #979797;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .card {
    border: 1px solid #000;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    &:hover{
      background: #000;
      .sub-title  .bg-yellow {
        background: #00FFFF;
        padding: 2px 5px;
      }
      .value-box  .value{
        color: #fff;
      }
      .icon-1 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-1-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }

      .icon-2 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-2-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }

      .icon-3 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-3-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }

      .icon-4 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-4-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }

      .icon-5 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-5-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }

      .icon-6 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-6-1.svg) no-repeat !important;
        background-size: 100% 100% !important;
      }
    }
    .sub-title {
      font-size: 16px;
      margin-bottom: 20px;

      .bg-yellow {
        padding: 2px 5px;
        background: #ffff00;
      }
    }

    .value-box {
      display: flex;
      justify-content: space-between;

      .value {
        word-wrap: break-word;
        width: 100px;
        flex: 1;
      }

      .icon-1 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-1.png);
        background-size: 100% 100%;
      }

      .icon-2 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-2.png);
        background-size: 100% 100%;
      }

      .icon-3 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-3.png);
        background-size: 100% 100%;
      }

      .icon-4 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-4.png);
        background-size: 100% 100%;
      }

      .icon-5 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-5.png);
        background-size: 100% 100%;
      }

      .icon-6 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-6.png);
        background-size: 100% 100%;
      }
    }
  }
}

.table-box {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;

  .table {
    display: table;
    width: 100%;
    min-width: 800px;

    .th {
      height: 40px;
      text-align: left;
    }

    .bg-yellow {
      background: #ffff00;
    }

    .header {
      height: 40px;
    }

    .tr {
      border-bottom: 1px solid #000;
      padding-bottom: 10px;
      height: 80px;

      .td {
        display: table-cell;
        text-align: left;
        line-height: 30px;

        .address {
          color: #00FFFF;
          // cursor: pointer;
        }

        p {
          line-height: 1.5;
        }
      }
    }
  }
}

.search-box {
  border: 1px solid #000;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0 20px;
  background: #fff;

  .inp-box {
    display: flex;
    align-items: center;
    flex: 1;

    .icon-search {
      width: 19px;
      height: 19px;
      background: url(~@/assets/icon-search.png);
      margin-right: 10px;
    }

    .input-search {
      width: 80%;

      &::v-deep {
        .el-input__inner {
          border: 0;
        }
      }
    }
  }

  .btn-search {
    background: #000;
    border-radius: 4px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 32px;
    color: #ffff00;
    cursor: pointer;
  }
}
</style>
