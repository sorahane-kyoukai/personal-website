import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

const RoutedPageStub = defineComponent({
  name: "RoutedPageStub",
  template: '<main data-testid="routed-page">空羽ノ境</main>',
});

const RouterViewStub = defineComponent({
  name: "RouterView",
  setup(_, { slots }) {
    return () => slots.default?.({ Component: RoutedPageStub });
  },
});

describe("App", () => {
  it("renders the site shell and routed page content", () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: RoutedPageStub }],
    });

    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: {
            name: "RouterLink",
            template: "<a><slot /></a>",
          },
          RouterView: RouterViewStub,
        },
      },
    });

    expect(wrapper.find(".site-header").exists()).toBe(true);
    expect(wrapper.find('[data-testid="routed-page"]').text()).toBe("空羽ノ境");
  });
});
