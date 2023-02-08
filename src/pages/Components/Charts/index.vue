<template>
  <div class="page-container">
    <n-grid :cols="3" :x-gap="18" :y-gap="12">
      <n-gi>
        <charts-card title="折线图">
          <ag-line-chart></ag-line-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="柱状图">
          <ag-bar-chart></ag-bar-chart>
        </charts-card>
      </n-gi>
      <n-gi>
        <charts-card title="饼状图">
          <ag-pie-chart></ag-pie-chart>
        </charts-card>
      </n-gi>
      <n-gi>
        <charts-card title="散点图">
          <ag-scatter-chart></ag-scatter-chart>
        </charts-card>
      </n-gi>
      <n-gi>
        <charts-card title="K线图">
          <ag-candlestick-chart></ag-candlestick-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="雷达图">
          <ag-radar-chart></ag-radar-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="矩形树图">
          <ag-treemap-chart></ag-treemap-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="旭日图">
          <ag-sunburst-chart></ag-sunburst-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="漏斗图">
          <ag-funnel-chart></ag-funnel-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="仪表盘">
          <ag-gauge-chart></ag-gauge-chart>
        </charts-card>
      </n-gi>

      <n-gi>
        <charts-card title="水流图">
          <ag-theme-river-chart></ag-theme-river-chart>
        </charts-card>
      </n-gi>

    </n-grid>
  </div>

</template>

<script lang="ts" setup>
import ChartsCard from '@/components/ChartsCard/index.vue'
import AgBarChart from '@/components/Charts/bar.vue'
import AgLineChart from '@/components/Charts/line.vue'
import AgPieChart from '@/components/Charts/pie.vue'
import AgScatterChart from '@/components/Charts/scatter.vue'
import AgCandlestickChart from '@/components/Charts/candlestick.vue'
import AgRadarChart from '@/components/Charts/radar.vue'
import AgTreemapChart from '@/components/Charts/treemap.vue'
import AgSunburstChart from '@/components/Charts/sunburst.vue'
import AgFunnelChart from '@/components/Charts/funnel.vue'
import AgGaugeChart from '@/components/Charts/gauge.vue'
import AgThemeRiverChart from '@/components/Charts/themeriver.vue'

</script>

<style lang="scss" scoped>
.page-container{
  padding: 20px;
  background: #f6f8f9;
}
</style>
