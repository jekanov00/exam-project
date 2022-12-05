import React from 'react';
import CONSTANTS from '../../constants';
import { connect } from 'react-redux';
import { getDataForContest } from '../../actions/actionCreator';
import { withRouter } from 'react-router-dom';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import { Field, reduxForm, reset } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import DomainInput from '../DomainInput';

let submitFunc;

class ContestForm extends React.Component {
  constructor(props) {
    super(props);
    submitFunc = props.submitData;
  }

  getPreference = () => {
    const { contestType } = this.props;
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        this.props.getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        this.props.getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        this.props.getData({ characteristic1: 'brandStyle' });
        break;
      }
      default: {
        throw new Error();
      }
    }
  };

  componentDidMount() {
    this.getPreference(this.props.contestType);
    this.props.initialize(
      this.props.contestType === CONSTANTS.NAME_CONTEST
        ? { ...this.props.defaultData, domain: 'yes' }
        : this.props.defaultData,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.contestType !== prevProps.contestType) {
      this.getPreference(this.props.contestType);
      this.props.initialize(
        this.props.contestType === CONSTANTS.NAME_CONTEST
          ? { ...this.props.defaultData, domain: 'yes' }
          : this.props.defaultData,
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(reset('contestForm'));
  }

  renderSpecialInputs = () => {
    switch (this.props.contestType) {
      case CONSTANTS.NAME_CONTEST: {
        return (
          <>
            <div className={styles.domainContainer}>
              <h2 className={styles.domainHeader}>
                Do you want a matching domain (.com URL) with your name?
              </h2>
              <p className={styles.domainDescription}>
                If you want a matching domain, our platform will only accept those name suggestions
                where the domain is available. (Recommended)
              </p>
              <div className={styles.domainRadioContainer}>
                <Field
                  name={'domain'}
                  type={'radio'}
                  component={DomainInput}
                  classes={{
                    radioInput: styles.radioInput,
                    radioHeader: styles.radioHeader,
                    radioText: styles.radioText,
                    radioActive: styles.radioActive,
                  }}
                  value={'asname'}
                  header={'Yes'}
                  text={'The Domain should exactly match the name'}
                />
                <Field
                  name={'domain'}
                  type={'radio'}
                  component={DomainInput}
                  classes={{
                    radioInput: styles.radioInput,
                    radioHeader: styles.radioHeader,
                    radioText: styles.radioText,
                    radioActive: styles.radioActive,
                  }}
                  value={'yes'}
                  header={'Yes'}
                  text={'But minor variations are allowed (Recommended)'}
                />
                <Field
                  name={'domain'}
                  type={'radio'}
                  component={DomainInput}
                  classes={{
                    radioInput: styles.radioInput,
                    radioHeader: styles.radioHeader,
                    radioText: styles.radioText,
                    radioActive: styles.radioActive,
                  }}
                  value={'no'}
                  header={'No'}
                  text={'I am only looking for a name, not a Domain'}
                />
              </div>
            </div>
            <Field
              name="styleName"
              component={SelectInput}
              header="Style name"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={this.props.dataForContest.data.nameStyle}
            />
            <Field
              name="typeOfName"
              component={SelectInput}
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              header="type of company"
              optionsArray={this.props.dataForContest.data.typeOfName}
            />
          </>
        );
      }
      case CONSTANTS.LOGO_CONTEST: {
        return (
          <>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>What name of your venture?</span>
              <Field
                name="nameVenture"
                component={FormInput}
                type="text"
                label="name of venture"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <Field
              name="brandStyle"
              component={SelectInput}
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              header="Brand Style"
              optionsArray={this.props.dataForContest.data.brandStyle}
            />
          </>
        );
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        return (
          <>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>What name of your venture?</span>
              <Field
                name="nameVenture"
                component={FormInput}
                type="text"
                label="name of venture"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <Field
              name="typeOfTagline"
              component={SelectInput}
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              header="Type tagline"
              optionsArray={this.props.dataForContest.data.typeOfTagline}
            />
          </>
        );
      }
      default: {
        throw new Error();
      }
    }
  };

  render() {
    const { isFetching, error } = this.props.dataForContest;
    const { handleSubmit } = this.props;
    if (error) return <TryAgain getData={this.getPreference} />;
    else
      return (
        <>
          {isFetching ? (
            <Spinner />
          ) : (
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>Title of contest</span>
                  <Field
                    name="title"
                    component={FormInput}
                    type="text"
                    label="Title"
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Field
                    name="industry"
                    component={SelectInput}
                    classes={{
                      inputContainer: styles.selectInputContainer,
                      inputHeader: styles.selectHeader,
                      selectInput: styles.select,
                    }}
                    header="Describe industry associated with your venture"
                    optionsArray={this.props.dataForContest.data.industry}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>What does your company / business do?</span>
                  <Field
                    name="focusOfWork"
                    component={FormTextArea}
                    type="text"
                    label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>Tell us about your customers</span>
                  <Field
                    name="targetCustomer"
                    component={FormTextArea}
                    type="text"
                    label="customers"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                {this.renderSpecialInputs()}
                <Field
                  name="file"
                  component={FieldFileInput}
                  classes={{
                    fileUploadContainer: styles.fileUploadContainer,
                    labelClass: styles.label,
                    fileNameClass: styles.fileName,
                    fileInput: styles.fileInput,
                  }}
                  type="file"
                />
              </form>
            </div>
          )}
        </>
      );
  }
}

const submit = (values) => {
  submitFunc(values);
};

const mapStateToProps = (state, ownProps) => {
  return {
    contestStore: state.contestStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(getDataForContest(data)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    reduxForm({
      form: 'contestForm',
      validate: customValidator(Schems.ContestSchem),
      onSubmit: submit,
    })(ContestForm),
  ),
);
