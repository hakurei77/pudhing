<!-- <template>
    <div class="w-full flex flex-col">
        <template v-for="(item, index) in dataListStore.dataList" :key="index">
            <template v-if="item.role === 'assistant'">
                <div class="w-[90%] mt-2 self-start text-justify text-sm">
                    <div class="flex items-center">
                        <ImgBox :scale="2" :src="imgScr" />
                        <span class="ml-2">小黑塔</span>
                        <SvgIcon class="ml-2 cursor-pointer" name="more" />
                    </div>
                    <div class="bg-[var(--background-gray)] rounded-xl p-4 mt-2">
                        <template v-for="(i, _) in item.content" :key="_">
                            <template v-if="i.type === 'text'">
                                <newMarkdownParser :data="i.text" />
                            </template>
                        </template>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import imgScr from "@/assets/imgs/xiaoheita.png";
import newMarkdownParser from "@/testComponent/newMarkdownParser.vue";
import { useDataListStore } from "@/store/dataList";
import { testData } from "./data";
const dataListStore = useDataListStore();

dataListStore.addSystemList();
dataListStore.addSystemData(testData);

</script>

<style scoped>

</style> -->