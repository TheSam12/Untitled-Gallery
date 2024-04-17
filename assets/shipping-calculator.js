document.addEventListener('alpine:init', () => {
  Alpine.data('ShippingCalculator', () => ({
    country: null,
    provinces: [],
    loading: false,
    errorMessages: null,
    searchParams: null,
    shippingRates: [],
    get shippingRatesResultsTitle() {
      if (this.shippingRates) {
        if (this.shippingRates.length === 1) {
          return window.theme.strings.shippingCalculatorResultsTitleOne;
        } else {
          return window.theme.strings.shippingCalculatorResultsTitleMany.replace(
            '{{ count }}',
            this.shippingRates.length
          );
        }
      }

      return '';
    },
    init() {
      this.$watch('country', (value) => {
        const optionEl = Array.from(this.$refs.countrySelect.options).filter(
          (option) => option.value === value
        )[0];

        this.provinces = optionEl.hasAttribute('data-provinces')
          ? JSON.parse(optionEl.dataset.provinces)
          : [];
      });

      this.$watch('shippingRates', (value, oldValue) => {
        if (value.length === 0) return;

        if (value.length !== oldValue.length) {
          this.$nextTick(() => {
            this.$refs.results.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          });
        }
      });
    },
    async onSubmit() {
      this.loading = true;
      this.errorMessages = null;

      this.searchParams = new URLSearchParams(new FormData(this.$refs.form));

      this.prepareRates();
    },
    async prepareRates() {
      const prepareURL = getURLAddingParams(
        `${window.theme.routes.cart_url}/prepare_shipping_rates.json`,
        this.searchParams
      );

      const prepareResponse = await fetch(prepareURL, { method: 'POST' });

      if (prepareResponse.ok) {
        this.getRates();
      } else {
        const errorData = await prepareResponse.json();

        this.errorMessages = errorData;
        this.loading = false;

        this.shippingRates = null;
      }
    },
    async getRates() {
      const getURL = getURLAddingParams(
        `${window.theme.routes.cart_url}/async_shipping_rates.json`,
        this.searchParams
      );

      try {
        const ratesResponse = await fetch(getURL);
        const ratesData = await ratesResponse.json();

        if (ratesData === null) {
          this.getRates();
        }

        if (ratesData.shipping_rates) {
          this.shippingRates = ratesData.shipping_rates;
          this.loading = false;
        }
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    },
    hasErrorFor(key) {
      if (this.errorMessages && this.errorMessages.hasOwnProperty(key)) {
        return true;
      }

      return false;
    },
  }));
});
