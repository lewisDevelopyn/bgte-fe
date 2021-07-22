<template>
  <div class="section container">
    <h2 class="title is-1 ml-2">Events</h2>
    <form action>
      <div class="field ml-4">
        <label for class="label">Search</label>
        <input
          type="text"
          placeholder="...Search"
          class="input w-80"
          v-model="search_input"
          required
        />
        <button @click="search_query" class="button is-success inline-block ml-4">Search</button>
      </div>
    </form>
    <div class="mh-80">
      <div
        v-if="events.length == 0 && fetched"
        class="is-flex is-align-items-center is-justify-content-center mh-30"
      >
        <p class="has-text-centered title is-4">{{error_message}}</p>
      </div>
      <div v-for="(event, index) in events" :key="index">
        <a class="is-clickable" @click="single_event(event)">
          <EventCard>
            <template v-slot:image>
              <div class="image" :style="render_background(event.image)"></div>
            </template>
            <template v-slot:name>
              <p class="title is-4">{{event.name}}</p>
            </template>
            <template v-slot:location>
              <p class="subtitle is-6">{{event.location}}</p>
            </template>
            <template v-slot:description>
              <div class="content mb-0" style="display: block">{{event.description}}</div>
            </template>
            <template v-slot:dates>
              <p>{{ event.start_date | formatTime }}</p>
            </template>
            <template v-slot:price>
              <p>{{event.currency_symbol}}{{event.price}} ({{event.currency}})</p>
            </template>
          </EventCard>
        </a>
      </div>
    </div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a
        class="pagination-previous ml-4 is-left"
        :disabled="page == 1"
        @click="navigate_page(-1)"
      >Previous</a>
      <ul class="pagination-list ml-2">
        <li>
          <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">{{page}}</a>
        </li>
      </ul>
      <a
        class="pagination-next mr-4 is-right"
        @click="navigate_page(1)"
        :disabled="all_events_queried"
      >Next page</a>
    </nav>
  </div>
</template>


<script>
import EventCard from "@/components/EventCard";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      error_message: "",
      fetched: false,
      page: 1,
      per_page: 10,
      search_input: "",
      all_events_queried: false
    };
  },
  methods: {
    async getEvents() {
      if (this.all_events_queried == false);
      try {
        const paginated_events =
          this.$route.query.search || this.search_input
            ? await this.$http.get(
                `/events?page=${this.$route.query.page}&search=${this.$route.query.search}`
              )
            : await this.$http.get(`/events?page=${this.$route.query.page}`);
        if (paginated_events.data) {
          this.events = paginated_events.data.events;
        }
        if (this.events.length == 0)
          this.error_message = "Sorry, we couldn't find any events.";
        if (this.events.length < this.per_page) this.all_events_queried = true;
      } catch (error) {
        this.error_message = error.response.data;
      }
      this.fetched = true;
    },
    set_filter(val) {
      switch (val) {
        case 1:
          this.filter_1 = !this.filter_1;
          break
        case 2:
          this.filter_2 = !this.filter_2;
          if (this.filter_2) {
            this.filter_3 = this.filter_4 = false;
          }
          break;
        case 3:
          this.filter_3 = !this.filter_3;
          if (this.filter_3) {
            this.filter_2 = this.filter_4 = false;
          }
          break;
        case 4:
          this.filter_4 = !this.filter_4;
          if (this.filter_4) {
            this.filter_3 = this.filter_2 = false;
          }
          break;
        default:
          this.filter_1 = this.filter_2 = this.filter_3 = this.filter_4 = false;
      }
    },
    navigate_page(val) {
      this.page += val;
      this.$router.push(
        this.search_input
          ? `/events?page=${this.page}&search=${this.search_input}`
          : `/events?page=${this.page}`
      );
      this.getEvents();
    },
    render_background(image) {
      return `background: url(${image})`;
    },
    search_query(e) {
      e.preventDefault();
      this.all_events_queried = false;
      this.page = 1;
      this.$router.push(`/events?page=1&search=${this.search_input}`);
      this.getEvents();
    },
    single_event(clicked_event) {
      this.$store.commit("store_event", clicked_event);
      this.$router.push(`/event/${clicked_event.id}`);
    }
  },
  filters: {
    formatTime(value) {
      if (!value) return "";
      let date = new Date(value.replace(" ", "T"));
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const month = monthNames[date.getMonth()];
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const output = month + "\n" + day + ", " + year;
      return output;
    }
  },
  mounted() {
    if (this.$route.query.page) this.page = this.$route.query.page;
    else this.page = 1;
    this.getEvents();
  }
};
</script>