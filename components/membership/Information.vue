<template>
   <section>
      <div id="TabbyPromo" class="mx-auto"></div>
      <div class="mb-5">
         <label class="text-sm">{{ $t("Package", "الباقة") }}</label>
         <p>
            {{ membership?.name }}
         </p>
      </div>

      <div class="mb-5">
         <label class="text-sm">{{ $t("Price", "السعر") }}</label>
         <p>
            <span class="me-2">{{ membership?.price.toLocaleString() }}</span>
            <span>{{ $t("SAR", "ريال") }}</span>
         </p>
      </div>

      <div class="mb-5">
         <label class="text-sm">{{ $t("Branch", "الفرع") }}</label>
         <p>
            {{ membership?.branch_name }}
         </p>
      </div>

      <div class="mb-5">
         <label class="text-sm">
            {{ $t("Membership start date", "تاريخ بدء الاشتراك") }}
         </label>
         <p>
            <span dir="ltr">{{ membership?.membership_start_date }}</span>
         </p>
      </div>

      <div class="mb-5">
         <label class="text-sm">
            {{ $t("Created at", "تاريخ انشاء الاشتراك") }}
         </label>
         <p>
            <span dir="ltr">{{ membership?.created_at }}</span>
         </p>
      </div>
   </section>
</template>

<script setup>
import * as tabbyPromo from "@/utils/tabbySnippet";

const props = defineProps(["membership"]);
const { $t } = useNuxtApp();

const currentLanguage = useCookie("lang");

onMounted(() => {
   const price = props.membership?.price;
   //const lang = $t("en", "ar")

   tabbyPromo.tabbysnippet("SAR", price, currentLanguage.value);
});

watch(
   () => currentLanguage.value,
   () => {
      const price = props.membership?.price;

      tabbyPromo.tabbysnippet("SAR", price, currentLanguage.value);
      console.log(currentLanguage.value);
   }
);
</script>
