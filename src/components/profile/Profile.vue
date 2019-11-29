<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card title="Update Profile">
          <form @submit.prevent="updateProfile">
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Grade"
                  v-model="profile.grade"
                  placeholder="Graduate"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-select
                  label="Title"
                  v-model="profile.title"
                  textBy="description"
                  :options="titleList"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-select
                  label="Gender"
                  v-model="profile.gender"
                  textBy="description"
                  :options="genderList"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-select
                  label="Marital Status"
                  v-model="profile.marital_status"
                  textBy="description"
                  :options="maritalList"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-date-picker
                    label="Date of Birth"
                    v-model="profile.dob"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="profile.phone_number"
                  type="tel"
                  label="Phone Number"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Address"
                  v-model="profile.address"
                  placeholder="Addo, Ajah"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="City"
                  v-model="profile.city"
                  placeholder="Ikeja"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="State"
                  v-model="profile.state"
                  placeholder="Lagos"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-select
                  label="Country"
                  v-model="profile.country"
                  :options="countriesList"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Postal Address"
                  v-model="profile.postal_address"
                  placeholder="Addo"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Chapter"
                  v-model="profile.chapter"
                  placeholder="Ajah"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Sector"
                  v-model="profile.sector"
                  placeholder="Sector"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Sub Sector"
                  v-model="profile.sub_sector"
                  placeholder="Sub Sector"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Occupationn"
                  v-model="profile.occupation"
                  placeholder="Plumber"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Institute"
                  v-model="profile.institute"
                  placeholder="Institute"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Qualification"
                  v-model="profile.qualification"
                  placeholder="SSCE"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Field Of Study"
                  v-model="profile.field_of_study"
                  placeholder="Yoruba Tech"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Year Of Graduation"
                  v-model="profile.year_of_graduation"
                  placeholder="2002"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Position Rank"
                  v-model="profile.position_rank"
                  placeholder="Senior"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Company"
                  v-model="profile.company"
                  placeholder="Menaget"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Location"
                  v-model="profile.location"
                  placeholder="Lekki"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Work Role"
                  v-model="profile.work_role"
                  placeholder="Managing Director"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Description"
                  v-model="profile.description"
                  placeholder="Explain what you like"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-date-picker
                    label="Start Date"
                    v-model="profile.start_date"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-date-picker
                    label="End Date"
                    v-model="profile.end_date"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                <va-button v-if="!isSubmit" type="submit" class="my-0">Update</va-button>
                <fingerprint-spinner
                v-if="isSubmit"
                :animation-duration="1500"
                :size="64"
                :color="'#4ae387'"
                />
              </div>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import CountriesList from '../../data/CountriesList'
import {callApi, LocalStore} from '@/app/utils'
import {FingerprintSpinner} from 'epic-spinners'
export default {
  name: 'profile',
  components: {FingerprintSpinner},
  data () {
    return {
        isSubmit: false,
        profile: {
            "grade": "Graduate",
            "title": "Mr",
            "marital_status": "Married",
            "dob": "04/04/1999",
            "gender": "Male",
            "phone_number": "07015120757",
            "address": "Addo, Ajah",
            "city": "Lagos",
            "state": "Lagos",
            "country": "Nigeria",
            "postal_address": "Addo",
            "chapter": "Lagos",
            "sector": "",
            "sub_sector": "",
            "occupation": "Yahoo yahoo",
            "institute": "",
            "qualification": "SSce",
            "field_of_study": "Yoruba Tech",
            "year_of_graduation": "2002",
            "position_rank": "senior",
            "company": "Menaget",
            "location": "Bahrain",
            "work_role": "Senior Yahoo Yahoo",
            "start_date": "04/04/1999",
            "end_date": "04/04/2024",
            "description": "Mad ooo"
        },
        countriesList: CountriesList,
        genderList: ["Male", "Female", "Binary"],
        maritalList: ["Single", "Married", "Divorder"],
        titleList:["Mr", "Mrs", "Miss"]
    }
  },
  methods: {
    updateProfile () {
        this.isSubmit = true;
        callApi('/profile/update', this.profile, 'post')
        .then(res => {
            this.isSubmit = false
            console.log(res);
        })
        .catch(err => {
            this.isSubmit = false
            console.log(err);
        })
    }
  },
  created () {
    this.$nextTick(() => {
      this.$validator.validateAll()
    })
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>
