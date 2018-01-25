import React, { Component } from "react";
import PropTypes from "prop-types";
import TextArea from 'react-autosize-textarea';
import TextInput from "../../../../components/TextInput";
import SelectBox from "../../../../components/SelectBox";
import Button from "../../../../components/Button";
import NotificationSystem from "../../../../components/NotificationSystem";
import { extractFieldValues } from "../../../../utils";

class AccountProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: extractFieldValues(props.profile)
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      profileData: { ...this.state.profileData, [name]: value }
    });
  };

  toggleLoginStatusVisibility = ({ target: { name } }) => {
    this.setState({
      profileData: {
        ...this.state.profileData,
        [name]: !this.state.profileData[name]
      }
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.updateProfileRequest({ profile: this.state.profileData });
  };

  render() {
    const { profileData } = this.state;
    const { profile, notification, dismissToaster, currentUser } = this.props;

    if(!profile || !profileData) {
      return (null)
    }

    return (
      <div>
        <NotificationSystem
          notification={notification}
          dismissToaster={dismissToaster}
        />
        <form onSubmit={this.handleOnSubmit}>
          <section className="settings__information">
            <h3 className="settings__header">Account Settings</h3>
            <input
              name="allow_others_to_see_last_login"
              type="checkbox"
              value={profileData.allow_others_to_see_last_login}
              onChange={this.toggleLoginStatusVisibility}
            />
            <label className="allow__others">
              Allow others to see the last time you logged into Catholic
              Singles
            </label>
          </section>
          <section className="settings__description">
            <h3>A Brief Description of Myself</h3>
            <div className="settings__fields">
              <div>
                <label>Birthday</label>
                <div className="birthday">
                  <SelectBox
                    name="birth_month"
                    className="birthday__field"
                    value={profileData.birth_month.toString()}
                    choices={profile.birth_month.available_values}
                    onChange={val =>
                      this.handleOnChange({
                        target: { name: "birth_month", value: val && val && val.value }
                      })}
                  />
                  <SelectBox
                    name="birth_day"
                    className="birthday__field"
                    value={profileData.birth_day.toString()}
                    choices={profile.birth_day.available_values}
                    onChange={val => 
                      this.handleOnChange({
                        target: { name: "birth_day", value: val && val && val.value }
                      })}
                  />
                  <SelectBox
                    name="birth_year"
                    className="birthday__field"
                    value={profileData.birth_year.toString()}
                    choices={profile.birth_year.available_values}
                    onChange={val =>
                      this.handleOnChange({
                        target: { name: "birth_year", value: val && val && val.value }
                      })}
                  />
                </div>
              </div>
              <div>
                <label>{profile.weight.label}</label>
                <SelectBox
                  name="weight"
                  value={profileData.weight}
                  choices={profile.weight.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "weight", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.activity_level.label}</label>
                <SelectBox
                  name="activity_level"
                  value={profileData.activity_level}
                  choices={profile.activity_level.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "activity_level", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.eye_color.label}</label>
                <SelectBox
                  name="eye_color"
                  value={profileData.eye_color}
                  choices={profile.eye_color.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "eye_color", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.gender.label}</label>
                <SelectBox
                  name="gender"
                  value={profileData.gender}
                  choices={profile.gender.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "gender", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.height.label}</label>
                <SelectBox
                  name="height"
                  value={profileData.height}
                  choices={profile.height.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "height", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.hair_color.label}</label>
                <SelectBox
                  name="hair_color"
                  value={profileData.hair_color}
                  choices={profile.hair_color.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "hair_color", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.personality.label}</label>
                <SelectBox
                  name="personality"
                  value={profileData.personality}
                  choices={profile.personality.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "personality", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.looks.label}</label>
                <SelectBox
                  name="looks"
                  value={profileData.looks}
                  choices={profile.looks.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "looks", value: val && val && val.value }
                    })}
                />
              </div>
            </div>
          </section>
          <section className="settings__location">
            <h3>My Location</h3>
            <div className="settings__fields">
              <div>
                <label>{profile.city_appear.label}</label>
                <TextInput
                  type="text"
                  name="city_appear"
                  value={profileData.city_appear}
                  onChange={this.handleOnChange}
                />
              </div>
              {currentUser.show_states &&
                <div>
                  <label>{profile.state_id.label}</label>
                  <SelectBox
                    name="state_id"
                    placeholder="State/Province"
                    value={profileData.state_id.toString()}
                    choices={profile.state_id.available_values}
                    onChange={val =>
                      this.handleOnChange({
                        target: { name: "state_id", value: val && val && val.value }
                      })}
                  />
                </div>
              }
              {currentUser.show_zipcodes &&
                <div>
                  <label>{profile.zip.label}</label>
                  <TextInput
                    name="zip"
                    type="text"
                    placeholder="Zip Code"
                    value={profileData.zip}
                    onChange={this.handleOnChange}
                  />
                </div>
              }
              <div>
                <label>{profile.parish.label}</label>
                <TextInput
                  name="parish"
                  type="text"
                  placeholder="What parish do you attend?"
                  value={profileData.parish}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
          </section>
          <section className="settings__vocational__background">
            <h3>My Vocational Background</h3>
            <div className="settings__fields">
              <div>
                <label>{profile.education.label}</label>
                <SelectBox
                  name="education"
                  value={profileData.education}
                  choices={profile.education.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "education", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.highschool.label}</label>
                <TextInput
                  name="highschool"
                  type="text"
                  placeholder="High school"
                  value={profileData.highschool}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>{profile.college.label}</label>
                <TextInput
                  name="college"
                  type="text"
                  placeholder="College Name"
                  value={profileData.college}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>{profile.occupation.label}</label>
                <TextInput
                  type="text"
                  name="occupation"
                  placeholder="Lawyer"
                  value={profileData.occupation}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
          </section>
          <section className="settings__family__background">
            <h3>My Family Background</h3>
            <div className="settings__fields">
              <div>
                <label>{profile.marital_status.label}</label>
                <SelectBox
                  name="marital_status"
                  value={profileData.marital_status}
                  choices={profile.marital_status.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "marital_status", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.ethnic_background.label}</label>
                <SelectBox
                  name="ethnic_background"
                  value={profileData.ethnic_background}
                  choices={profile.ethnic_background.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "ethnic_background", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.birth_order.label}</label>
                <SelectBox
                  name="birth_order"
                  value={profileData.birth_order}
                  choices={profile.birth_order.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "birth_order", value: val && val && val.value }
                    })}
                />
              </div>
            </div>
          </section>
          <section className="settings__interests">
            <h3>My Interests</h3>
            <div className="settings__fields">
              <div>
                <label>{profile.hobbies.label}</label>
                <SelectBox
                  name="hobbies"
                  value={profileData.hobbies}
                  choices={profile.hobbies.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "hobbies", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.inamatch.label}</label>
                <SelectBox
                  name="inamatch"
                  value={profileData.inamatch}
                  choices={profile.inamatch.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "inamatch", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.foods.label}</label>
                <TextInput
                  name="foods"
                  type="text"
                  value={profileData.foods}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>{profile.movies.label}</label>
                <TextInput
                  name="movies"
                  type="text"
                  value={profileData.movies}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>{profile.books.label}</label>
                <TextInput
                  name="books"
                  type="text"
                  value={profileData.books}
                  onChange={this.handleOnChange}
                />
              </div>
              <div>
                <label>{profile.music.label}</label>
                <TextInput
                  name="music"
                  type="text"
                  value={profileData.music}
                  onChange={this.handleOnChange}
                />
              </div>
            </div>
          </section>
          <section className="settings__questions">
            <h3>Questions Asked About Me</h3>
            <div className="settings__fields">
              <div>
                <label>{profile.living_situation.label}</label>
                <SelectBox
                  name="living_situation"
                  value={profileData.living_situation}
                  choices={profile.living_situation.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "living_situation", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.raised_in.label}?</label>
                <SelectBox
                  name="raised_in"
                  choices={profile.raised_in.available_values}
                  value={profileData.raised_in}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "raised_in", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.children.label}?</label>
                <SelectBox
                  name="children"
                  value={profileData.children}
                  choices={profile.children.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "children", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.date_with_children.label}?</label>
                <SelectBox
                  name="date_with_children"
                  value={profileData.date_with_children}
                  choices={profile.date_with_children.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "date_with_children", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.want_children.label}?</label>
                <SelectBox
                  name="want_children"
                  value={profileData.want_children}
                  choices={profile.want_children.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "want_children", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.catholicity.label}?</label>
                <SelectBox
                  name="catholicity"
                  value={profileData.catholicity}
                  choices={profile.catholicity.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "catholicity", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.marry_church.label}?</label>
                <SelectBox
                  name="marry_church"
                  value={profileData.want_children}
                  choices={profile.marry_church.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "marry_church", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.attendance.label}</label>
                <SelectBox
                  name="attendance"
                  value={profileData.attendance}
                  choices={profile.attendance.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "attendance", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.pray.label}?</label>
                <SelectBox
                  name="pray"
                  value={profileData.pray}
                  choices={profile.pray.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "pray", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.drink.label}?</label>
                <SelectBox
                  name="drink"
                  value={profileData.drink}
                  choices={profile.drink.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "drink", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.smoke.label}?</label>
                <SelectBox
                  name="smoke"
                  value={profileData.smoke}
                  choices={profile.smoke.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "smoke", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.politics.label}?</label>
                <SelectBox
                  name="politics"
                  value={profileData.politics}
                  choices={profile.politics.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "politics", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.driving_distance.label}?</label>
                <SelectBox
                  name="driving_distance"
                  value={profileData.driving_distance}
                  choices={profile.driving_distance.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "driving_distance", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.crisis.label}?</label>
                <SelectBox
                  name="crisis"
                  value={profileData.crisis}
                  choices={profile.crisis.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "crisis", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.planning.label}</label>
                <SelectBox
                  name="planning"
                  value={profileData.planning}
                  choices={profile.planning.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "planning", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.tendtobe.label}</label>
                <SelectBox
                  name="tendtobe"
                  value={profileData.tendtobe}
                  choices={profile.tendtobe.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "tendtobe", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.money.label}</label>
                <SelectBox
                  name="money"
                  value={profileData.money}
                  choices={profile.money.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "money", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.difficult_situation.label}?</label>
                <SelectBox
                  name="difficult_situation"
                  value={profileData.difficult_situation}
                  choices={profile.difficult_situation.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "difficult_situation", value: val && val && val.value }
                    })}
                />
              </div>
              <div>
                <label>{profile.pets.label}</label>
                <SelectBox
                  name="pets"
                  value={profileData.pets}
                  choices={profile.pets.available_values}
                  onChange={val =>
                    this.handleOnChange({
                      target: { name: "pets", value: val && val && val.value }
                    })}
                />
              </div>
            </div>
          </section>
          <section className="settings__preference">
            <h3>My Preference</h3>
            <div className="preference">
              <label>Age range of members I'm most interested in</label>
              <div className="age">
                <SelectBox
                  name="age_interested_low"
                  value={profileData.age_interested_low}
                  choices={profile.age_interested_low.available_values}
                  onChange={(val) => this.handleOnChange({target: { name: "age_interested_low", value: val && val && val.value}})}
                />
                <span>to</span>
                <SelectBox
                  name="age_interested_high"
                  value={profileData.age_interested_high}
                  choices={profile.age_interested_high.available_values}
                  onChange={(val) => this.handleOnChange({target: { name: "age_interested_high", value: val && val && val.value}})}
                />
              </div>
            </div>
          </section>
          <section className="settings__essay">
            <h3>Essays</h3>
            <p>
              Please use the space below to write, edit or erase your essay
              answers. When finished, hit SAVE to keep your changes. Essays
              should be interesting, entertaining and add insight into your
              personality. Essays are part of your public profile so keep that
              in mind when revealing any information you wish to keep private.
            </p>
            <div>
              <label>{profile.essay_about_me.label}</label>
              <TextArea
                name="essay_about_me"
                value={profileData.essay_about_me}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>{profile.religious_experience.label}</label>
              <TextArea
                name="religious_experience"
                value={profileData.religious_experience}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>{profile.essay_being_catholic.label}</label>
              <TextArea
                name="essay_being_catholic"
                value={profileData.essay_being_catholic}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>{profile.essay_looking_for.label}</label>
              <TextArea
                name="essay_looking_for"
                value={profileData.essay_looking_for}
                onChange={this.handleOnChange}
              />
            </div>
            <div>
              <label>{profile.essay_first_date.label}</label>
              <TextArea
                name="essay_first_date"
                value={profileData.essay_first_date}
                onChange={this.handleOnChange}
              />
            </div>
          </section>
          <Button type="submit" className="settings__update-button">
            Save Profile
          </Button>
        </form>
      </div>
    );
  }
}

AccountProfilePage.propTypes = {
  profile: PropTypes.object,
  nofication: PropTypes.shape({
    toastType: PropTypes.string,
    message: PropTypes.string
  }),
  dismissTaoster: PropTypes.func
};

export default AccountProfilePage;
