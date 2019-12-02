<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <h1 class="headerOne">Update Profile</h1>
        <!-- <va-card title="Update Profile"> -->
          <div class="flex xs12">
            <va-card title="Upload Profile Photo">
              <va-file-upload
                type="gallery"
                file-types=".png, .jpg, .jpeg"
                v-model="gallery"
              />
              <va-inner-loading class="flex-center py-3" :loading="isLoading">
                <va-button @click="savePhoto()">
                  Save
                </va-button>
              </va-inner-loading>
            </va-card>
          </div>
          <form @submit.prevent="updateProfile">
            <va-card title="Bio Data">
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-select
                  label="Grade"
                  v-model="profile.grade"
                  :options="gradeList"
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
            </div>
            </va-card>
            <va-card title="Education">
            <div class="row">
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
            </div>
            </va-card>
            <va-card title="Experience">
            <div class="row">
              <div class="flex md4 sm6 xs12">
                <va-input
                  label="Occupationn"
                  v-model="profile.occupation"
                  placeholder="Plumber"
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
            </va-card>
          </form>
        <!-- </va-card> -->
      </div>
    </div>
  </div>
</template>

<script>
import CountriesList from '../../data/CountriesList'
import { callApi } from '@/app/utils'
import { FingerprintSpinner } from 'epic-spinners'
export default {
  name: 'profile',
  components: { FingerprintSpinner },
  data () {
    return {
      isSubmit: false,
      isLoading: false,
      gallery: [],
      profile: {
        'grade': '',
        'title': '',
        'marital_status': '',
        'dob': '',
        'gender': '',
        'phone_number': '',
        'address': '',
        'city': '',
        'state': '',
        'country': '',
        'postal_address': '',
        'chapter': '',
        'sector': '',
        'sub_sector': '',
        'occupation': '',
        'institute': '',
        'qualification': '',
        'field_of_study': '',
        'year_of_graduation': '',
        'position_rank': '',
        'company': '',
        'location': '',
        'work_role': '',
        'start_date': '',
        'end_date': '',
        'description': '',
      },
      countriesList: CountriesList,
      genderList: ['Male', 'Female', 'Binary'],
      maritalList: ['Single', 'Married', 'Divorder'],
      titleList: ['Mr', 'Mrs', 'Miss'],
      gradeList: ['Graduate', 'Associate', 'Fellow'],
    }
  },
  methods: {
    updateProfile () {
      this.isSubmit = true
      callApi('/profile/update', this.profile, 'post')
        .then(res => {
          this.isSubmit = false
          console.log(res)
        })
        .catch(err => {
          this.isSubmit = false
          console.log(err)
        })
    },
    savePhoto () {
      this.isLoading = true
      let photoFormData = new FormData()
      photoFormData.append('passport', this.gallery[0])
      callApi('/profile/update/passport', photoFormData, 'post')
        .then(res => {
          console.log(res)
          this.isLoading = false
        })
        .then(err => {
          console.error(err)
          this.isLoading = false
        })
    },
  },
  created () {
    callApi(`/profile`, {}, 'get')
      .then(res => {
        this.profile = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
  .headerOne {
    margin: 0px 0px 20px 10px;
  }
</style>
